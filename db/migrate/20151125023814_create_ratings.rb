class CreateRatings < ActiveRecord::Migration
  def change
    create_table :ratings do |t|
      t.integer :rating, null: false
      t.integer :user_id, null: false
      t.integer :book_id, null: false

      t.timestamps null: false
    end

    add_index :ratings, :user_id
    add_foreign_key :ratings, :users

    add_index :ratings, :book_id
    add_foreign_key :ratings, :books
  end
end
