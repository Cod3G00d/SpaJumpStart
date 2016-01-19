# SpaJumpStart

</br>
<i><ul><strong>N.B. this is currently under development, I have full working code that can be made available, in a much rawer state if required in the meantime. Just drop me a mail.</strong>
</br></i>

Todate, the Angular Spa application, links Aysnchronously via a set of services to a RESTful WebAPI service written as a mixture of ASPE.NET WebAPI 2 and earlier (mainly to showcase both methods).

The WebAPI uses a Repository and Unit of Work patterns, to link to a SQL Express database written using the Code First approach within Entity Framework 6. Requests are made using REST Verbs, asynchronously using Tasks.

The CRUD operations are performed on the database context using Transactions.

The Angular app is written using modules, developed in Typescript, which allows use of strongly typed and defined modules that register with themeselves with the  Angular Modules.

The Angular app also uses Modal Forms for Login and some of the CRUD operations.

All of this is secured using a combination of Cors, Owin, and Identity built into the WebAPI Service, which allows Token Authentication.  Customer Data and User data including Logins and Roles is stored in a SQL Server Database, again using Entity Framework as the ORM for data persistence.

Finally Bower and Gulp were used to install, build and package the Angular / Typescript spa app.
</br>
<h3>SPA - using JS Frameworks, EF6/WebAPI 2, DDD in Visual Studio Community 2015</h3>
</br>
<ul><strong>Overview</strong>
</br></br>
This is a project to showcase what I have learned so far on a SPA app(s) using some of the JS Frameworks coupled with Web API2 and Entity Framework 6.
</br></br>
The main focus was to learn some of the JavaScript Frameworks being used at the moment, along with Entity Framework (Code First) approaches.
</br></br>
The solution has been architectured using DDD, and the onion skin approach, and makes use of SOLID principles including Separation of Concerns, Inversion Of Control Containers and Dependency Injection (IOC/DI).  
</br></br>
I have also used Repository and Unit Of Work patterns, and DTO's alongside EF6 for the ORM (an approach I have used in the past with Fluent NHibernate).
</br></br>
These are approaches that I have used throughout my career.
</br></br>
The Angular project makes use of node modules, npm, bower and gulp, and tsd manager. rather than Nuget Packages. It's also written in Typescript.

</br></br>

The following frameworks are used for the Presentation Layers:
</br>
<ul><strong>Angular App:</strong>
<li>AngularJS</li>
<li>Angular Route</li>
<li>Angular UI Modals</li>
<li>Angular Bootstrap</li>
<li>Bootstrap</li>
<li>JQuery</li>
<li>HTML5</li>
<li>Typescript</li>
<li>Bower</li>
<li>NodeJS and node_modules</li>
<li>npm</li>
<li>tsd</li>
<li>Gulp</li>
</ul>
</br>
<ul><strong>Knockout App:</strong>Not yet copied across see: https://github.com/dtro-devuk/HTML5.ScratchPad 
<li>KnockoutJS</li>
<li>RequireJS</li>
<li>Bootstrap</li>
</ul>
</br>
<ul><strong>Infrastructure and Services Layers:</strong>
<li>C#</li>
<li>ASP.Net MVC 5</li>
<li>ASP.Net Web API 2</li>
<li>ASP.Net Web Identity</li>
<li>Entity Framework 6</li>
<li>Web API2</li>
<li>Autofac/Ninject</li>
<li>AutoMapper</li>
<li>OWIN</li>
<li>Cors</li>
</ul>
</br>
<ul><strong>Instructions</strong>
<li>Open the solution using <span style="color:brown">Visual Studio 2015</li>
<li>Build the solution to restore Nuget packages</li>
<li>Run</li>
</ul>

</br>
Some useful Entity Framework Migration Commands:
<ul>
<li>Enable-Migrations –EnableAutomaticMigrations -ContextTypeName SpaJumpstart.Data.Context.EF.SpaDbContext -force</li>
<li>Add-Migration 'InitialCreate-SpaAppDb'</li>
<li>Update-Database -verbose -force</li>
</ul>

</br>
References:
<ul>
<li>WebAPI Documentation - http://codethug.com/2015/01/16/web-api-deep-dive-customizing-auto-generated-documentation-part-1-of-6/</li>
</ul>
