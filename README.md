# project2
Our second project.

<ul>
 <% for(let i = 0; i < allWines.length; i++) { %>
   <li>
     <a href="/wines/<%=i%>"><%=allWines[i].name%></a>

     <form action="/wines/<%=i; %>?_method=DELETE" method="POST">
       <input type="submit" value="DELETE"/>
     </form>
     <a href="/wines/<%=i; %>/edit">Edit</a>
   </li>
<%  } %>
</ul>
<nav>
<a href="/wines/new">Create a New Wine</a>
</nav>
