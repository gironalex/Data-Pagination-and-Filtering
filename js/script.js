/*** 
* Treehouse FSJS Techdegree:
* FSJS Project 2 - Data Pagination and Filtering
* by Alex Giron
* April 2021
***/

// ------------------------------------------- showPage Function -----------------------------------------------

/*** 
  showPage function will insert/append elements to display a page of 9 students.
  @param1 {[array]} list - student data that will be passed as an argument.
  @param2 {[number]} page - page number that we want to display.
  @returns {[DOM element]} - returns DOM elements of the matching students.
***/

function showPage ( list, page ) {
   // Calculating the index of the 1st & last student.
   const itemsPerPage = 9;
   const startIndex = ( page * itemsPerPage ) - itemsPerPage;
   const endIndex = page * itemsPerPage;
   
   // Referencing ul element with the student-list class & setting to an empty string.
   const studentList = document.querySelector( '.student-list' );
   studentList.innerHTML = '';

   // studentItem is an empty string that will be converted to a template literal to display students info.
   let studentItem = '';

   // Looping through the list
   for ( let i = 0; i < list.length; i++ ) {
      if ( i >= startIndex && i < endIndex ) {
         studentItem += 
         `<li class="student-item cf">
            <div class="student-details">
              <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
              <h3>${list[i].name.first} ${list[i].name.last}</h3>
              <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
              <span class="date">${list[i].registered.date}</span>
            </div>
          </li>`;
      }
   }
   return studentList.insertAdjacentHTML('beforeend', studentItem);
}

// ------------------------------------------- addPagination Function --------------------------------------------

/*** 
  addPagination function will create/append pagination buttons.
  @param1 {[array]} list - student data that will be passed as an argument.
***/

function addPagination( list ) {
   // Calculating the # of pagination buttons we wil need.
   const itemsPerPageP = 9;
   const numOfPages = Math.ceil( list.length / itemsPerPageP );
   
   // Referencing ul element with the link-list class & setting to an empty string.
   const linkList = document.querySelector( '.link-list' );
   linkList.innerHTML = '';

   // pagButtons is an empty string that will be converted to a template literal to display pagination buttons.
   let pagButtons = '';

   // looping through the list
   for ( let i = 1; i <= numOfPages; i++ ) {
      pagButtons += 
      `<li>
         <button type = "button">${i}</button>
      </li>`;
   }
   linkList.insertAdjacentHTML('beforeend', pagButtons);

   // Selecting the 1st pagination button & giving it a class name.
   document.querySelector('li > button').className = 'active';
   

   // Listening for clicks
   linkList.addEventListener('click', (e) => {
      if ( e.target.tagName === 'BUTTON' ) {
         
         // Removing the active class from any other button
         document.querySelector('.active').className = '';
         
         // Adding the active class to the 'clicked' button
         e.target.className = 'active';

         // Calling the showPage function to the button that was clicked
         showPage(list, e.target.textContent);
      }
   });
}
// ------------------------------------------- + Search Component --------------------------------------------

// Referencing the header element and inserting a search input field.
const searchHeader = document.querySelector('.header');
const searchBox = 
   `<label for="search" class="student-search">
   <span>Search by name</span>
   <input id="search" placeholder="Search by name...">
   <button id= "searchButton" type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>`;

searchHeader.insertAdjacentHTML('beforeend', searchBox);

// --- + Functionality to Search Component --- + Pagination for Search Results --- Handle No Search Matches --- 

/*** 
  searchMatches function will return a new array with names of students that match the text content in the 
  search bar
  @param1 {[string]} searchInput - students names typed in the search bar.
  @param2 {[array]} list - student data that will be passed as an argument.
  @return {[array]} matchList - array with the matched students typed in the search bar.
***/

function searchMatches (searchInput, list) {
   let matchedList = [];
   for (let i = 0; i < list.length; i++) {
      let studentNames = `${list[i].name.first} ${list[i].name.last}`.toLowerCase();
      if (searchInput != 0 && studentNames.includes(searchInput)) {
         matchedList.push(list[i]);
      }
   }
      return matchedList;
} 

/*** 
  searchStudentsPage function will display, on the page, the students that are being searched. If not matches 
  are found, the page will display "No results found"
  @param1 {[array]} searchMatchesList - array with updated list of matched students
***/

function searchStudentsPage(searchMatchesList) {
   // removing any students that have been previously displayed
   const studentList = document.querySelector( '.student-list' );
   studentList.innerHTML = '';
   
   // removing pagination buttons that have been previously displayed
   const linkList = document.querySelector( '.link-list' );
   linkList.innerHTML = '';

   if (searchMatchesList.length === 0) {
      studentList.innerHTML = '<h1>No results found</h1>'; 
   } else {
      showPage(searchMatchesList, 1);
      addPagination(searchMatchesList);
      }
   }

// --------------------------------------- Submit + Keypup Listeners ------------------------------------------

// Variables to reference the input and search button elements
const searchBar = document.querySelector('input');
const searchButton = document.querySelector('#searchButton');

// submit listener 
searchButton.addEventListener('click', (e) => {
   e.preventDefault();
   const searchInput = searchBar.value.toLowerCase();
   searchStudentsPage(searchMatches(searchInput, data));
 });
 
 // keyup listener 
 searchBar.addEventListener('keyup', (e) => {
   const searchInput = e.target.value.toLowerCase();
   searchStudentsPage(searchMatches(searchInput, data));
 });

// ------------------------------------------- Calling Functions ---------------------------------------------
showPage(data, 1);
addPagination(data);