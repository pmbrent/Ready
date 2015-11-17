class CreateShelvings < ActiveRecord::Migration
  def change
    create_table :shelvings do |t|
      t.integer :shelf_id, null: false
      t.integer :book_id, null: false

      t.timestamps null: false
    end

    add_index :shelvings, :shelf_id
    add_foreign_key :shelvings, :shelves

    add_index :shelvings, :book_id
    add_foreign_key :shelvings, :books
  end
end
