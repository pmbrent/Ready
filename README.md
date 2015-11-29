# Ready

[Heroku link][heroku]

[heroku]: https://readybooks.herokuapp.com/

## Minimum Viable Product

Ready is a web application inspired by Goodreads built using Ruby on Rails
and React.js. Ready allows users to:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create an account
- [x] Log in / Log out
- [x] Organize books within Shelves displayed on User pages
- [x] Search for Books by Author, Title, ISBN
- [x] Add Friends
- [x] View a Feed of Friend activity
- [x] Rate books and get recommendations

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, JSON API (1 day)

Phase 1 will use BCrypt to allow user signup and secure login. On login, users will
be taken to the main page, with containers for the user's feed/React components.
For now, pages will render JSON.
The user model will contain a username, email, and a Librarian boolean indicating administrator access.

[Details][phase-one]

### Phase 2: Books, Shelves, Flux and Views (2 days)

In Phase 2, I'll create the Book model (with title, author, ISBN) and seed with some example books. Next, there will be a shelf model (belonging to a user and having many books through Shelvings). The next step will be to set up Flux routing for individual book view pages and an individual's shelves. There will be a Book Store, although only Librarians will be able to perform CRUD.

[Details][phase-two]

### Phase 3: Book Searching (1 day)

Phase 3 will be to give the Book model (with title, author, ISBN) searching by any of those three. Search result components should allow immediate rating [to be implemented] or adding to shelves, or a redirect to the book's show page, which also allows those actions.

[Details][phase-three]

### Phase 4: Friending and Activity Feed (1.5 days)

Users will be able to add friends through a Friendship join table and see those friends' recently shelved books in their homepages.

[Details][phase-four]

### Phase 5: Rating, Reviews, & Recommendations (2 days)

Users will be able to rate a book on a 5-point scale; their ratings will be used to generate a list of recommended books by genre (using only the user's favorites if any). These recommendations will update live based on the user's interactions with their recommendations.

[Details][phase-five]

### Phase 6: Refactoring and CSS (1 day)

In Phase 6, the user experience will be enhanced by the implementation of more polished layouts.

[Details][phase-six]

### Bonus Features (TBD)
- [ ] Feed contains recommended books
- [ ] Write reviews as part of ratings
- [ ] Tag books with multiple genres and search books by genre
- [ ] Users can like/comment on other users' ratings
- [ ] Receive notifications of new Friends and comments
- [ ] Set reading goals and track progress
- [ ] Users can edit profiles and add photos
- [ ] Author pages
- [ ] Favorite quotes lists
- [ ] Email confirmation on signup
- [ ] Optimizations: Genres can be encoded as numbers for faster lookup
- [ ] Multiple sessions
- [ ] Users can import books from Amazon

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
[phase-six]: ./docs/phases/phase6.md
