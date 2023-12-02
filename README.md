<p align="center">
  <img src="https://raw.githubusercontent.com/psinha40898/Jiltd/master/images/Header.PNG">
</p>

<h1 align = "center"> 
Design Documentation
</h1>

<h2>
Summary:
</h2>
<ul>
<li>
Function as a social network app that encourages healthy anonymous discussions
</li>
<li>
Designed with <a href = "https://reactnative.dev/"> React Native </a>  to prioritize velocity in cross platform development
</li>
<li>
The engagement loop is driven by performant matchmaking which uses <a href = "https://firebase.google.com/docs/reference/js"> Firebase BaaS </a>
(backend as a service) to handles race conditions

<a href = "https://firebase.google.com/docs/firestore/manage-data/transactions">
(read more about transactions) </a>
</li>
<li>
The BaaS also provides a database that is used for gamificiation of users
</li>
</ul>

<h2>
High Level Design

</h2>

<p align="center">
  <img src="https://raw.githubusercontent.com/psinha40898/Jiltd/master/images/HiLev.png">
</p>

<h2>
Crux of Matchmaking
</h2>

<h3>Matchmaking is offered through reliance on two types of database transactions</h3>

<h4>The first transaction verifies and ensures that the user's data is ready for matchmaking</h4>
<h4>The second transaction performs a set of reads to establish the state of matchmaking. It performs a set of writes on the client user and their prospective partner upon a succesful match. These writes determine whether a user is matched, ready for a match, or simply not looking. </h4>

