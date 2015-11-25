# Schema Information

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
email       | string    | not null, unique, indexed
name        | string    | not null, unique, indexed
photo_url   | string    |

## books
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author      | string    | not null, indexed
author_id   | integer   | indexed, foreign key (refernces users)
title       | string    | not null, indexed
isbn        | integer   | not null, unique, indexed
description | string    |

## shelves
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
title       | string    | not null

## shelvings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
book_id     | integer   | not null, indexed, foreign key (references books)
shelf_id    | integer   | not null, indexed, foreign key (references shelves)

## genres
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null, indexed

## genre_taggings
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
genre_id        | integer   | not null, indexed, foreign key (references genres)
book_id         | integer   | not null, indexed, foreign key (references books)

## friendships
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
followed_user   | integer   | not null, indexed, foreign key (references users)
following_user  | integer   | not null, indexed, foreign key (references users)

## ratings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
rating      | integer   | not null, indexed
book_id     | integer   | not null, indexed, foreign key (references books)
user_id     | integer   | not null, indexed, foreign key (references users)
