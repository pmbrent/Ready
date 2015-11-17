class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.bigint :isbn, null: false
      t.integer :author_id
      t.text :description

      t.timestamps null: false
    end
    add_index :books, :isbn, unique: true
    add_index :books, :title
    add_index :books, :author
    add_index :books, :author_id
  end
end
