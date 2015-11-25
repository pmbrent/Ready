# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151125023814) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "books", force: :cascade do |t|
    t.string   "title",                 null: false
    t.string   "author",                null: false
    t.integer  "isbn",        limit: 8, null: false
    t.integer  "author_id"
    t.text     "description"
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "books", ["author"], name: "index_books_on_author", using: :btree
  add_index "books", ["author_id"], name: "index_books_on_author_id", using: :btree
  add_index "books", ["isbn"], name: "index_books_on_isbn", unique: true, using: :btree
  add_index "books", ["title"], name: "index_books_on_title", using: :btree

  create_table "friendships", force: :cascade do |t|
    t.integer  "followed_user_id",  null: false
    t.integer  "following_user_id", null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  add_index "friendships", ["followed_user_id"], name: "index_friendships_on_followed_user_id", using: :btree
  add_index "friendships", ["following_user_id"], name: "index_friendships_on_following_user_id", using: :btree

  create_table "ratings", force: :cascade do |t|
    t.integer  "rating",     null: false
    t.integer  "user_id",    null: false
    t.integer  "book_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "ratings", ["book_id"], name: "index_ratings_on_book_id", using: :btree
  add_index "ratings", ["user_id"], name: "index_ratings_on_user_id", using: :btree

  create_table "shelves", force: :cascade do |t|
    t.integer  "user_id",    null: false
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "shelves", ["user_id"], name: "index_shelves_on_user_id", using: :btree

  create_table "shelvings", force: :cascade do |t|
    t.integer  "shelf_id",   null: false
    t.integer  "book_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "shelvings", ["book_id"], name: "index_shelvings_on_book_id", using: :btree
  add_index "shelvings", ["shelf_id"], name: "index_shelvings_on_shelf_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                            null: false
    t.string   "email",                           null: false
    t.string   "password_digest",                 null: false
    t.string   "session_token",                   null: false
    t.boolean  "librarian",       default: false
    t.datetime "created_at",                      null: false
    t.datetime "updated_at",                      null: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["name"], name: "index_users_on_name", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

  add_foreign_key "friendships", "users", column: "followed_user_id"
  add_foreign_key "friendships", "users", column: "following_user_id"
  add_foreign_key "ratings", "books"
  add_foreign_key "ratings", "users"
  add_foreign_key "shelves", "users"
  add_foreign_key "shelvings", "books"
  add_foreign_key "shelvings", "shelves"
end
