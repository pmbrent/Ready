# Ready
(Note: Ready is no longer being actively maintained.)

[Visit Ready! (Live)][livelink]

[livelink]: http://www.readybooks.xyz/

## Get Ready to find your new favorite book!

Ready is a web application inspired by Goodreads built using Ruby on Rails and React.js. Ready allows users to:

- [x] Create an account
- [x] Log in / Log out securely with BCrypt
- [x] Organize books within Shelves displayed on User pages
- [x] Search for Books by Author, Title, ISBN
- [x] Add Friends
- [x] View a Feed of Friend activity
- [x] Rate books and get recommendations
- [x] Dynamically view detailed book information on hover

## Design Docs
* [View Wireframes][view]
* [DB schema][schema]

[view]: ./docs/views.md
[schema]: ./docs/schema.md

### Future Features
- [ ] Tag books with multiple genres and search books by genre
- [ ] Write reviews as part of ratings
- [ ] Users can like/comment on other users' ratings
- [ ] Receive notifications of new Friends and comments
- [ ] Set reading goals and track progress
- [ ] Feed contains recommended books, "featured" books
- [ ] Users can edit profiles and add photos using Paperclip/AWS
- [ ] Author pages and special access for authors
- [ ] Favorite quotes lists (separate table)
- [ ] Email confirmation on signup using Mailer
- [ ] Optimizations: Genres can be encoded as numbers for faster lookup
- [ ] Multiple sessions
- [ ] Users can import books from Amazon using OmniAuth
