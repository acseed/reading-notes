Object.assign(window.search, {"doc_urls":["translate/Loom-Proposal.html#loom项目java-虚拟机的-fibers-和-continuations","translate/Loom-Proposal.html#概览","translate/Loom-Proposal.html#动机","translate/Loom-Proposal.html#loom项目java-虚拟机的-fibers-和-continuations","translate/Loom-Proposal.html#概览","translate/Loom-Proposal.html#动机"],"index":{"documentStore":{"docInfo":{"0":{"body":3,"breadcrumbs":4,"title":3},"1":{"body":0,"breadcrumbs":1,"title":0},"2":{"body":3,"breadcrumbs":1,"title":0},"3":{"body":3,"breadcrumbs":6,"title":3},"4":{"body":0,"breadcrumbs":3,"title":0},"5":{"body":3,"breadcrumbs":3,"title":0}},"docs":{"0":{"body":"translated from https://cr.openjdk.org/~rpressler/loom/Loom-Proposal.html","breadcrumbs":"translation » Loom项目：Java 虚拟机的 Fibers 和 Continuations","id":"0","title":"Loom项目：Java 虚拟机的 Fibers 和 Continuations"},"1":{"body":"Loom项目的使命是使人们更容易的编写，调试，描述和维护并发程序，以满足今天对并发程序的需求。Java从一开始就提供了线程, 一直以来都是一种自然和方便的并发结构(先不谈论线程间通信这个另外的话题),现在正在被一种不是太容易的抽象所取代，因为它作为操作系统内核线程的实现并不足以满足今天的需求，它浪费计算资源，而这在云计算领域尤其重要。Loom项目将会引进fiber作为一种轻量，高效的线程来被Java虚拟机管理，让开发者使用少量成本，就可以使用相同的抽象并且带来更高的性能。我们想再次让并发编程变得简单。fiber由两部分组成 - continuation和调度器。由于Java已经以ForkJoinPool的方式提供了一个非常优秀的调度器了，fiber的实现将会在JVM上添加continuations.","breadcrumbs":"translation » 概览","id":"1","title":"概览"},"2":{"body":"很多JVM上的应用程序， 像服务器和数据库，是并发的，这意味着他们需要并发的服务很多请求，并且这些请求并发的对计算资源进行竞争。Loom项目的目的是有效减小编写并发程序的困难程度，或者更准确的说，根除编写并发程序时在简单和高效之间的权衡。 二十多年来，Java最重要的贡献之一就是原生支持献策会给你和同步。Java线程(直接或者间接使用线程，例如Java Servlets 处理HTTP请求)提供了一个相对简单的抽象来编写并发应用程序。当今，编写能满足需求的并发程序的难点之一是线程运行时提供的软件并发单元不能匹配领域并发单元的规模,例如一个用户， 一个事务，或者一个操作。尽管应用程序的并发单元略显粗糙--比如说一个会话，被一个socket连接表示--一个服务端可以处理一百万个并发socket连接，但是Java运行时不行，Java运行时线程使用操作系统的线程实现，并不能有效处理多于数千的请求。这种数量级的差异带来很大影响。 程序员被迫做出选择，或者直接以线程建模领域并发单元，同时失去一台服务器可以支持大规模并发的优势, 或者采用其他比线程更细粒度的并发实现(tasks)，编写异步代码并且不阻塞执行线程。","breadcrumbs":"translation » 动机","id":"2","title":"动机"},"3":{"body":"translated from https://cr.openjdk.org/~rpressler/loom/Loom-Proposal.html","breadcrumbs":"translation » Loom-Proposal » Loom项目：Java 虚拟机的 Fibers 和 Continuations","id":"3","title":"Loom项目：Java 虚拟机的 Fibers 和 Continuations"},"4":{"body":"Loom项目的使命是使人们更容易的编写，调试，描述和维护并发程序，以满足今天对并发程序的需求。Java从一开始就提供了线程, 一直以来都是一种自然和方便的并发结构(先不谈论线程间通信这个另外的话题),现在正在被一种不是太容易的抽象所取代，因为它作为操作系统内核线程的实现并不足以满足今天的需求，它浪费计算资源，而这在云计算领域尤其重要。Loom项目将会引进fiber作为一种轻量，高效的线程来被Java虚拟机管理，让开发者使用少量成本，就可以使用相同的抽象并且带来更高的性能。我们想再次让并发编程变得简单。fiber由两部分组成 - continuation和调度器。由于Java已经以ForkJoinPool的方式提供了一个非常优秀的调度器了，fiber的实现将会在JVM上添加continuations.","breadcrumbs":"translation » Loom-Proposal » 概览","id":"4","title":"概览"},"5":{"body":"很多JVM上的应用程序， 像服务器和数据库，是并发的，这意味着他们需要并发的服务很多请求，并且这些请求并发的对计算资源进行竞争。Loom项目的目的是有效减小编写并发程序的困难程度，或者更准确的说，根除编写并发程序时在简单和高效之间的权衡。 二十多年来，Java最重要的贡献之一就是原生支持献策会给你和同步。Java线程(直接或者间接使用线程，例如Java Servlets 处理HTTP请求)提供了一个相对简单的抽象来编写并发应用程序。当今，编写能满足需求的并发程序的难点之一是线程运行时提供的软件并发单元不能匹配领域并发单元的规模,例如一个用户， 一个事务，或者一个操作。尽管应用程序的并发单元略显粗糙--比如说一个会话，被一个socket连接表示--一个服务端可以处理一百万个并发socket连接，但是Java运行时不行，Java运行时线程使用操作系统的线程实现，并不能有效处理多于数千的请求。这种数量级的差异带来很大影响。 程序员被迫做出选择，或者直接以线程建模领域并发单元，同时失去一台服务器可以支持大规模并发的优势, 或者采用其他比线程更细粒度的并发实现(tasks)，编写异步代码并且不阻塞执行线程。","breadcrumbs":"translation » Loom-Proposal » 动机","id":"5","title":"动机"}},"length":6,"save":true},"fields":["title","body","breadcrumbs"],"index":{"body":{"root":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"p":{"df":0,"docs":{},"s":{":":{"/":{"/":{"c":{"df":0,"docs":{},"r":{".":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"j":{"d":{"df":0,"docs":{},"k":{".":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"/":{"df":0,"docs":{},"~":{"df":0,"docs":{},"r":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"/":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"/":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}}}}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"j":{"df":0,"docs":{},"v":{"df":0,"docs":{},"m":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"项":{"df":0,"docs":{},"目":{"df":0,"docs":{},"：":{"df":0,"docs":{},"j":{"a":{"df":0,"docs":{},"v":{"a":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"l":{".":{"df":0,"docs":{},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"m":{"df":0,"docs":{},"l":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"v":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}}}}},"o":{"c":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"breadcrumbs":{"root":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":2,"docs":{"0":{"tf":1.4142135623730951},"3":{"tf":1.4142135623730951}}}}}}}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":2,"docs":{"0":{"tf":1.4142135623730951},"3":{"tf":1.4142135623730951}}}}},"df":0,"docs":{}}},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"t":{"df":0,"docs":{},"p":{"df":0,"docs":{},"s":{":":{"/":{"/":{"c":{"df":0,"docs":{},"r":{".":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"e":{"df":0,"docs":{},"n":{"df":0,"docs":{},"j":{"d":{"df":0,"docs":{},"k":{".":{"df":0,"docs":{},"o":{"df":0,"docs":{},"r":{"df":0,"docs":{},"g":{"/":{"df":0,"docs":{},"~":{"df":0,"docs":{},"r":{"df":0,"docs":{},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"e":{"df":0,"docs":{},"s":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"/":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"/":{"df":0,"docs":{},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}},"df":0,"docs":{}}}}}},"df":0,"docs":{}}}}}}}}}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}},"df":0,"docs":{}}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}},"df":0,"docs":{}}}}}},"j":{"df":0,"docs":{},"v":{"df":0,"docs":{},"m":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":3,"docs":{"3":{"tf":1.0},"4":{"tf":1.0},"5":{"tf":1.0}},"项":{"df":0,"docs":{},"目":{"df":0,"docs":{},"：":{"df":0,"docs":{},"j":{"a":{"df":0,"docs":{},"v":{"a":{"df":2,"docs":{"0":{"tf":1.4142135623730951},"3":{"tf":1.4142135623730951}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}},"p":{"df":0,"docs":{},"r":{"df":0,"docs":{},"o":{"df":0,"docs":{},"p":{"df":0,"docs":{},"o":{"df":0,"docs":{},"s":{"a":{"df":0,"docs":{},"l":{".":{"df":0,"docs":{},"h":{"df":0,"docs":{},"t":{"df":0,"docs":{},"m":{"df":0,"docs":{},"l":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}},"df":0,"docs":{}}},"df":3,"docs":{"3":{"tf":1.0},"4":{"tf":1.0},"5":{"tf":1.0}}}}}}}},"s":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":0,"docs":{},"v":{"df":0,"docs":{},"l":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}}}}},"o":{"c":{"df":0,"docs":{},"k":{"df":0,"docs":{},"e":{"df":0,"docs":{},"t":{"df":2,"docs":{"2":{"tf":1.0},"5":{"tf":1.0}}}}}},"df":0,"docs":{}}},"t":{"df":0,"docs":{},"r":{"a":{"df":0,"docs":{},"n":{"df":0,"docs":{},"s":{"df":0,"docs":{},"l":{"a":{"df":0,"docs":{},"t":{"df":6,"docs":{"0":{"tf":1.4142135623730951},"1":{"tf":1.0},"2":{"tf":1.0},"3":{"tf":1.4142135623730951},"4":{"tf":1.0},"5":{"tf":1.0}}}},"df":0,"docs":{}}}}},"df":0,"docs":{}}}}},"title":{"root":{"c":{"df":0,"docs":{},"o":{"df":0,"docs":{},"n":{"df":0,"docs":{},"t":{"df":0,"docs":{},"i":{"df":0,"docs":{},"n":{"df":0,"docs":{},"u":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}}}}}},"df":0,"docs":{},"f":{"df":0,"docs":{},"i":{"b":{"df":0,"docs":{},"e":{"df":0,"docs":{},"r":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}}}},"df":0,"docs":{}}},"l":{"df":0,"docs":{},"o":{"df":0,"docs":{},"o":{"df":0,"docs":{},"m":{"df":0,"docs":{},"项":{"df":0,"docs":{},"目":{"df":0,"docs":{},"：":{"df":0,"docs":{},"j":{"a":{"df":0,"docs":{},"v":{"a":{"df":2,"docs":{"0":{"tf":1.0},"3":{"tf":1.0}}},"df":0,"docs":{}}},"df":0,"docs":{}}}}}}}}}}}},"lang":"English","pipeline":["trimmer","stopWordFilter","stemmer"],"ref":"id","version":"0.9.5"},"results_options":{"limit_results":30,"teaser_word_count":30},"search_options":{"bool":"OR","expand":true,"fields":{"body":{"boost":1},"breadcrumbs":{"boost":1},"title":{"boost":2}}}});