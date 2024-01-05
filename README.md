<p align="center">
  <img src="https://raw.githubusercontent.com/psinha40898/Jiltd/master/images/Header.PNG">
</p>
<h2 align = "center" > About</h2>
<p> Jiltd facilitates healthy and anonymous discussion between people. Users are matched with each other and can leave feedback on the impact of their conversations. Those who receive positive feedback attain recognition and gamified rewards. Anonymity is enforced in an attempt to foster a community that values listening and helping others irrespective of their identity.</p>

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

<h3>The application operates in the following loop</h3> 
<h4> The user interacts with the client</h4>
<h4> The client communicates with the BaaS</h4>
<h4> The BaaS uses atomic transactions to perform read/writes</h4>
<h4> The BaaS passes data back to the client </h4>
<h4> The client conditionally renders output for the user </h4>
<h4> The user interacts with the up to date client and the cycle repeats</h4>

<h2>
Crux of Matchmaking
</h2>

<h3>Matchmaking is offered through reliance on a core database transaction</h3>
<p>
An atomic transaction handles concurrency by treating a set of reads and writes as one unified operation. The operation does not proceed if data read in the transaction is modified outside of the transaction. In that case, the transaction restarts. This handles race conditions that would otherwise occur if reads and writes were not unified.
</p>


<h4>High Level PSEUDOCODE for the  transaction </h4>
<p>  <i> performs a set of reads to establish the state of matchmaking, performs a set of writes on the client user and their prospective partner upon a succesful match. </i> </p>
<p> <i> These writes determine whether a user is matched, ready for a match, or simply not looking </i> </p>
<p> <a href = "https://github.com/psinha40898/Jiltd/blob/master/screens/matchMake.ts"> Actual code </a> </p>

  <img align = "center" src="https://raw.githubusercontent.com/psinha40898/Jiltd/master/images/T2.PNG">

  <h2> References and Supplementary Reading </h2>
  <ul>
  <li> <a href = "https://firebase.google.com/docs/reference/js"> Firebase BaaS </a> </li>
  <li> <a href = "https://www.youtube.com/watch?v=dOVSr0OsAoU"> Transactions by Google </a> </li>
  <li> <a href = "https://reactnative.dev/"> React Native </a>  </li>
  <li> <a href = "https://web.mit.edu/6.005/www/fa14/classes/17-concurrency/#:~:text=Concurrency%20means%20multiple%20computations%20are,cores%20on%20a%20single%20chip)"> Concurrency </a> </li>

  </ul>

