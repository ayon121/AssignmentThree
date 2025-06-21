<h1>Borrowed Books Feature – Library API</h1>
<p>This node server manages borrowing books from a library system, including inventory updates and detailed summaries of borrow activity using MongoDB aggregation.</p>
<hr>


<h2>Features</h2>
<ul>
  <li>Borrow a book</li>
  <li>Automatically decrease available copies</li>
  <li>Mark book as unavailable when copies reach zero</li>
  <li>Store borrow records with timestamps</li>
  <li>Get a summarized report of all borrowed books</li>
  <li>Aggregated view of total borrowed quantity per book</li>
  <li>Includes book details  in summary</li>
</ul>


<h2> Tech Stack</h2>
<ul>
  <li>Node.js with Express</li>
  <li>MongoDB with Mongoose</li>
  <li>TypeScript</li>
  <li>MongoDB Aggregation Pipeline</li>
</ul>


<h2> Project Includes</h2>
<ul>
  <li>Proper schema validation</li>
  <li>Business logic enforcement (e.g., availability control on borrow)</li>
  <li>Use of aggregation pipeline</li>
  <li>At least one Mongoose static or instance method</li>
  <li>Filtering features</li>
</ul>



<h2> Book Model Fields & Validation</h2>
<ul>
  <li><strong>title</strong> (<code>string</code>) — <em>Mandatory</em>. The book’s title.</li>
  <li><strong>author</strong> (<code>string</code>) — <em>Mandatory</em>. The book’s author.</li>
  <li>
    <strong>genre</strong> (<code>string</code>) — <em>Mandatory</em>. Must be one of:
    <code>FICTION</code>, <code>NON_FICTION</code>, <code>SCIENCE</code>,
    <code>HISTORY</code>, <code>BIOGRAPHY</code>, <code>FANTASY</code>.
  </li>
  <li><strong>isbn</strong> (<code>string</code>) — <em>Mandatory and unique</em>. The book’s International Standard Book Number.</li>
  <li><strong>description</strong> (<code>string</code>) — <em>Optional</em>. A brief summary or description of the book.</li>
  <li><strong>copies</strong> (<code>number</code>) — <em>Mandatory</em>. Non-negative integer representing total copies available.</li>
  <li><strong>available</strong> (<code>boolean</code>) — <em>Defaults to true</em>. Indicates if the book is currently available for borrowing.</li>
</ul>




<h2> Borrow Model Fields & Validation</h2>
<ul>
  <li><strong>book</strong> (<code>ObjectId</code>) — <em>Mandatory</em>. References the borrowed book’s ID.</li>
  <li><strong>quantity</strong> (<code>number</code>) — <em>Mandatory</em>. Positive integer representing the number of copies borrowed.</li>
  <li><strong>dueDate</strong> (<code>date</code>) — <em>Mandatory</em>. The date by which the book must be returned.</li>
</ul>



<h2>Installation & Setup</h2>

<p>Follow these steps to set up and run the server locally:</p>

<ol>
  <li>
    <strong>Clone the repository:</strong><br>
    <pre><code>git clone https://github.com/ayon121/AssignmentThree.git</code></pre>
  </li>

  <li>
    <strong>Navigate to the project directory:</strong><br>
    <pre><code>cd your-repo-name</code></pre>
  </li>

  <li>
    <strong>Install dependencies:</strong><br>
    <pre><code>npm install</code></pre>
  </li>

  <li>
    <strong>Create a <code>.env</code> file in the root directory and add your environment variables:</strong><br>
    <pre><code>
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library
    </code></pre>
  </li>

  <li>
    <strong>Start the development server:</strong><br>
    <pre><code>npm run dev</code></pre>
    <p>or for production:</p>
    <pre><code>npm start</code></pre>
  </li>

  <li>
    <strong>Server will be running at:</strong><br>
    <pre><code>http://localhost:5000</code></pre>
  </li>
</ol>

<p><strong>Note:</strong> Make sure MongoDB is running locally or provide a cloud MongoDB URI.</p>



<h2>Author</h2>
<p>Created by <strong>Ayon Saha</strong><br>
GitHub: <a href="https://github.com/ayon121" target="_blank">https://github.com/ayon121</a><br>

