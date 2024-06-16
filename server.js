import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load posts from JSON file
const dataFilePath = path.join(__dirname, 'data', 'posts.json');

// Function to read posts from file
const readPostsFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error('Error reading posts:', err);
        return [];
    }
};

// Function to write posts to file
const writePostsToFile = (posts) => {
    try {
        fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
    } catch (err) {
        console.error('Error writing posts:', err);
    }
};

// Route: Home Page - View all posts
app.get('/', (req, res) => {
    const posts = readPostsFromFile();
    res.render('index', { posts });
});

// Route: Create New Post
app.get('/create', (req, res) => {
    res.render('create');
});

// Route: Handle Create New Post (Form Submission)
app.post('/create', (req, res) => {
    const { userName, postTitle } = req.body;
    res.redirect(`/write?name=${encodeURIComponent(userName)}&title=${encodeURIComponent(postTitle)}`);
});

// Route: Write Post Content
app.get('/write', (req, res) => {
    const { name, title } = req.query;
    res.render('write', { name, title });
});

// Route: Save Post Content
app.post('/write', (req, res) => {
    const { name, title, content } = req.body;
    const newPost = { id: Date.now(), name, title, content, createdAt: new Date() };

    const posts = readPostsFromFile();
    posts.push(newPost);
    writePostsToFile(posts);

    res.redirect('/');
});

// Route: View Single Post
app.get('/view/:id', (req, res) => {
    const posts = readPostsFromFile();
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('view', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Route: Edit Post
app.get('/edit/:id', (req, res) => {
    const posts = readPostsFromFile();
    const post = posts.find(p => p.id == req.params.id);
    if (post) {
        res.render('edit', { post });
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle the POST request to update a post
app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    const posts = readPostsFromFile();
    const index = posts.findIndex(p => p.id == id);
    if (index !== -1) {
        // Update the post
        posts[index].title = title;
        posts[index].content = content;

        // Save updated posts back to file
        writePostsToFile(posts);

        // Redirect to view the edited post or to homepage
        res.redirect(`/view/${id}`);
    } else {
        res.status(404).send('Post not found');
    }
});


// Route: Delete Post
app.post('/delete/:id', (req, res) => {
    const { id } = req.params;
    const posts = readPostsFromFile();
    const newPosts = posts.filter(p => p.id != id);
    writePostsToFile(newPosts);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Blog Site listening at ${port}`);
});
