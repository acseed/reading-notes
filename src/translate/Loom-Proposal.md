##### translated from https://cr.openjdk.org/~rpressler/loom/Loom-Proposal.html
# Loom项目：Java 虚拟机的 Fibers 和 Continuations

[TOC]

## 概览

<hr/>

Loom项目的使命是使人们更容易的编写，调试，分析和维护并发程序，以满足今天对并发程序的需求。Java从一开始就提供了线程, 一直以来都是一种自然和方便的并发结构(先不谈论线程间通信这个另外的话题),现在正在被一种不是太容易的抽象所取代，因为它作为操作系统内核线程的实现并不足以满足今天的需求，它浪费计算资源，而这在云计算领域尤其重要。Loom项目将会引进fiber作为一种轻量，高效的线程来被Java虚拟机管理，让开发者使用少量成本，就可以使用相同的抽象并且带来更高的性能。我们想再次让并发编程变得简单。fiber由两部分组成 - continuation和调度器。由于Java已经以ForkJoinPool的方式提供了一个非常优秀的调度器了，fiber的实现将会在JVM上添加continuations.

## 动机

<hr/>

很多JVM上的应用程序， 像服务器和数据库，是并发的，这意味着他们需要并发的服务很多请求，并且这些请求并发的对计算资源进行竞争。Loom项目的目的是有效减小编写并发程序的困难程度，或者更准确的说，根除编写并发程序时在简单和高效之间的权衡。

二十多年来，Java最重要的贡献之一就是原生支持献策会给你和同步。Java线程(直接或者间接使用线程，例如Java Servlets 处理HTTP请求)提供了一个相对简单的抽象来编写并发应用程序。当今，编写能满足需求的并发程序的难点之一是线程运行时提供的软件并发单元不能匹配领域并发单元的规模,例如一个用户， 一个事务，或者一个操作。尽管应用程序的并发单元略显粗糙--比如说一个会话，被一个socket连接表示--一个服务端可以处理一百万个并发socket连接，但是Java运行时不行，Java运行时线程使用操作系统的线程实现，并不能有效处理多于数千的请求。这种数量级的差异带来很大影响。

程序员被迫做出选择，或者直接以线程建模领域并发单元，同时失去一台服务器可以支持大规模并发的优势, 或者采用其他比线程更细粒度的并发实现(tasks)，编写异步代码并且不阻塞执行线程。

近些年已经看到很多异步API被引入Java生态系统， 来自JDK的异步NIO,异步servlets和很多异步的第三方库. 这些APIs被创建，并不是因为他们容易理解或编写，相反他们实际上更难；不是因为他们容易调试或者分析-他们更难，甚至不产生有意义的调用栈;并不是因为比同步API更容易组合 - 他们组合的并不优美；并不是因为他们更适合接下来的语言或者跟已存在的代码集成更好 - 他们反而更糟， 仅仅是因为在Java中，软件并发单元的实现线程在空间占用和性能视角来说不足。这是一个负面的案例，丢掉一个优秀和自然的抽象而拾起一个不那么自然的抽象，这在很多方面很不好，仅仅是因为这个抽象的运行时性能属性。

但是使用内核级线程来实现Java的线程确实有一些优势--尤其重要的是所有的本地代码是被内核线程支持的，线程中的Java代码可以访问本地API。上面说的弊端也是不可忽视的，导致难写，难维护，或者导致很严重的计算资源浪费， 这个这云计算环境中尤甚。其实，一些语言或者语言的运行时已经成功提供了轻量级线程的实现，最出名的莫过于Erlang和Go,这种特性是很流行很有用的。

这个项目的主要目标就是添加我们叫做fibers的轻量级线程，被Java运行时管理，可以跟重量级，基于操作系统的线程共存使用。Fibers非常轻量级，比内核线程占用内存少，任务上下文切换的成本近乎0.单个JVM实例可以催动百万级的fibers,程序员不比在为同步阻塞调用感到不适，这里阻塞成本几乎免费。除了让并发应用程序更简单和更灵活，它还可以让库作者受益，他们不必再为了简单性和性能而权衡提供同步和异步两套API。简单而不妥协。

我们将会看到，一个线程并不是一个原子性的结构，而是两个东西的组合 -- 一个调度器和一个continuation.这是我们目前关心的两个事情，在此基础上实现Java fibers, 尽管fibers才是这个项目的动机，同时也作为面向用户的抽象添加continuations,因为continuations也有应用案例，比如 Python的generators。

## 目标和范围 

<hr/>

Fibers 能够提供一种低层级的原语，在这之上可以实现一些有趣的变成范式，比如channels, actors和dataflow, 虽然这些用例应该被考虑，但是这个项目的目标不是设计这些高层级的结构， 也不是建议新的编程风格或者推荐fibers之间信息交换的模式(例如，共享内存和消息传递)。因为限制线程内存访问是其他OpenJDK项目的主题，并且这适用于线程抽象的任何实现，无论是重量级还是轻量级，这个项目将会可能与其他项目交叉。

这个项目的目标是为Java平台添加一种轻量级线程构造fibers。这种构造面向用户的表示将会在后面讨论。目标是让大多数Java代码(是说在class files中的Java code, 并不一定必须是Java语言写的)无修改或者做很少修改就可以在fiber中运行。让Java调用的本地代码在fiber中运行不是这个项目的需要，尽管这在某些情况下是可能的。让所有在fiber中运行的代码都享受到fiber带来的性能优势也不是本项目的目标，事实上，一些不太适合轻量级线程的代码反而会带来负面的性能。

给Java平台增加一个公开的限定的continuation(或者叫coroutine)构造是这个项目的目标之一。然而， 这在计划表中优先级是排在fibers后面的, fibers需要continuations, 接下来会解释，只实现fibers并不需要暴露一个公开的API。

这个项目的目标之一是为fibers实验多种调度器， 但是实施多种严肃的调度器设计研究，并不是本项目的意图，主要是因为我们认为ForkJoinPool是一个非常优秀的fiber调度器。

毫无疑问，操作JVM调用栈的能力是需要的，所以这个项目的目标之一是添加一种轻量级的允许在某些点展开栈然后用给定参数调用一个方法(基本上，一种高效尾递归的泛化)。我们称这个特性为unwind-and-invoke, 或者UAI。添加一个自动尾递归优化并不是本项目的目标。

这个项目可能会涉及很多个Java平台的组件,按照被认可的特征分类如下：

- Continuations和UAI将会在JVM实现并且暴露成一个非常薄的Java APIs.
- Fibers将会在Java和JDK库中最大限度实现，但是可能会需要JVM的一些支持。
- 利用本地代码并阻塞线程的JDK库需要适配到能够在fibers中运行.尤其是这意味着需要修改java.io包的类。
- 利用低层级线程同步的JDK库(尤其是LockSupport类)，像java.util.concurrent包中的，需要适配到支持fibers,但是需要的工作量取决于fiber API， 在大部分情况下，预计工足量很小，因为fibers暴露了跟线程相似的API
- 调试器，分析器和其他可用性服务需要感知fibers以提供好的用户体验。这意味着JFR和JVMTI需要考虑fibers,还有相关的平台MBeans也需要顾及到fibers。
- 现在，我们还没有预见到需要修改Java语言

对这个项目来说， 现在还为时过早，所有的情况，包括范围都有可能变化。


## 术语

 <hr/>

 由于内核线程和轻量级线程是基于同样的线程抽象，一些术语方面的混淆会相继发生。本文档采用下面的惯例，所有的信件需要符合这一套规则：
 - thread这个词仅指抽象层面，并不指具体实现，所以thread可能指任何线程抽象的实现，无论是OS实现还是运行时实现。
 - 当提及具体的实现时，重量级线程， 内核线程， OS线程可互换使用， 表示操作系统内核线程。轻量级线程，用户级线程，fiber可互换表示语言运行时线程。这些术语并不特指某些java类。
 - 首字母大写的Thread和Fiber特指专门的Java类，将会在讨论设计API和实现的时候频繁使用。

 ## 线程是什么

 <hr/>

线程是一串线性执行的计算机指令。当我们处理操作时，不仅仅是计算，也涉及IO, 基于时间的停顿和同步。通常，指令流会等待某些外部事件，线程有能力挂起他自己，然后当他等待的事件发生时自动回复，当一个线程等待时，他应该让出CPU,让其他线程运行。

这些能力由两件事情提供。continuation是顺序执行的一串指令指令，它可能挂起他自己(Continuations部分会详细讲解)。调度器分配continuation到CPU核心，用一个准备执行的取代一个暂停的，保证一个continuation可以恢复的话，最终会被安排在一个CPU核执行。线程需要两个构建：continuation和调度器，尽管这两个不一定必须暴露成API.

至少在这个上下文，线程是一种基础的抽象，并不暗示任何变成范式。尤其是指着抽象允许程序员编写顺序代码，这代码可以执行和暂停，并不指任何线程信息共享策略，比如共享内存或者消息传递。

既然有两个独立的部分，我们可以分别实现。目前，Java平台提供的线程构造是Thread类， 是基于内核线程，依赖于操作系统对continuation和scheduler的实现。

continuation构造可以和现有的Java调度器结合来实现fibers，比如ForkJoinPool, ThradPoolExecutor或者第三方库， 或者其他针对这些目标优化的库

分开实现运行时线程和OS线程这两种构建块是可能的，例如，Google对Linux内核的修改，允许用户级代码接管内核线程调度，所以，基本上实现continuation依赖于OS, 而调度则有很多可选的库。用户级代码做调度有一些益处，但是仍然允许本地代码在线程中运行，但是仍然承受高资源使用量的缺点，还有不可改变大小的栈，最后不可访问。分离这两种实现的另一种方式，调度还是OS, 运行时实现continuation, 看起来并没有什么益处，他结合了两者的缺点。

但是，用户级线程在哪些方面比内核级线程好呢？凭什么值得这个迷人的名称，轻量级线程？再一次适合思考下这两个组件：continuation和调度器。

为了挂起一个计算，continuation需要保存整个调用栈上上下文，或者简单存储整个栈。为了支持本地语言，内存存储栈需要连续的和保存在相同的地址。虽然虚拟内存提供了一定的灵活性， 但是仍然有一些限制取决于这内核continuation需要轻量和多灵活。理想情况下，我们期望栈增长和缩小取决于用多少。因为语言运行时实现的小城不需要支持任意的本地代码，我们可以获得更多如何存储continuation的灵活性， 这有助于减少内存使用。

OS实现线程最大的问题在于调度器。一方面，OS调度器运行在内核态，每当线程阻塞，调度器接管，一个并不廉价的用户态内核态上下文切换就会发生。另一方面，OS调度器是为通用目的设计的，调度各种各样的线程，但是一个解码视频的线程跟一个服务网络请求的线程并不一样，相同的调度算法针对两者并不是最优的。在服务器上处理事务的线程倾向于某种确定的模式，这对通用调度去提出了挑战。例如，这个一个普遍的模式，线程A对请求执行一些操作，然后传递一些数据给线程B, 线程B进行进一步处理。在传递数据的时候这需要一些同步，这个可能涉及一个锁或者消息队列，但是模式是一样的： A操作一些数据x，然后交给B,唤醒B然后阻塞直到A需要处理另一个请求。这个模式是如此的通用以至于我们可以假设A会唤醒B之后会阻塞一会， 然后调度B到跟A相同的内核将会是有益的，因为x已经在这个核的缓存上了；另外，将B加入内核本地队列并不需要任何高昂的同步.实际上，一个工作窃取的调度器比如ForkJoinPool做了这种精确的假定，他把被调度的任务加入一个本地队列。然而，OS内核不能做这种假设，就它所知，线程A想在唤醒B之后运行一会，它会调度最近唤醒的B到一个不同的内核，因此， 两边都需要同步，同时在B访问x的时候导致缓存未命中。

## Fibers

<hr/>

Fibers我们称作Java的计划用户级线程。本部分将会列出fibers的需求，探索一些设计问题和选择。并是详尽的描述，而是仅仅展现设计空间大致的轮廓， 提供一个涉及到的挑战的直观感受。

就基本的能力而言，fibers应该可以跟其他的线程(无论轻量级还是重量级)一起可以运行任意的Java代码，允许用户等待他们结束，或者称作join他们。



## Continuations

<hr/>

## 调度器

<hr/>

## 解开后调用

<hr/>

## 额外的挑战

<hr/>

## 其他方法

<hr/>