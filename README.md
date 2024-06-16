Blog-Net
Blog-Net is a simple blog website built using Node.js, Express.js, and EJS. It allows users to create, view, edit, and delete blog posts. The posts are stored locally in a JSON file.

Features:
Post Creation: Users can create new blog posts.
Post Viewing: Users can view all their blog posts on the home page.
Post Update/Delete: Users can edit and delete their existing posts.
Responsive Design: The application is styled to be responsive and user-friendly on both desktop and mobile devices.
Technical Requirements
Node.js & Express.js: The application is built using Node.js and Express.js. Express.js handles routing and middleware.
EJS: EJS is used as the templating engine to generate dynamic HTML.

**Installation**
Clone the repository:
git clone https://github.com/yourusername/blog-net.git
cd blog-net

**Install dependencies:**

npm install

**Start the application:**
npm start

Open your browser and navigate to http://localhost:3000.

File Structure
public/: Contains static assets like CSS and JavaScript files.
views/: Contains EJS templates.
index.ejs: The main page displaying all posts.
create.ejs: The page for creating new posts (name and title).
write.ejs: The page for writing the content of a new post.
view.ejs: The page for viewing a single post.
edit.ejs: The page for editing a post.
data/: Contains the posts.json file where all posts are stored.
app.js: The main server file.
Usage
Creating a Post
Go to the home page and click on the "Create Post" button.
Enter your name and the title of the post, then click "Continue to Write".
On the next page, write the content of your post and click "Submit".
Viewing a Post
On the home page, click the "View" button on a post to see its full content.
Editing a Post
On the view page of a post, click the "Edit" button to modify the post's title and content.
Deleting a Post
On the view page of a post, click the "Delete" button to remove the post.

Contributing
If you would like to contribute to this project, please fork the repository and submit a pull request with your changes. We welcome improvements and bug fixes.

License
This project is licensed under the MIT License.
