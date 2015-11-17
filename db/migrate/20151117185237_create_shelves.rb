class CreateShelves < ActiveRecord::Migration
  def change
    create_table :shelves do |t|
      t.integer :user_id, null: false
      t.string :title, null: false

      t.timestamps null: false
    end
    add_index :shelves, :user_id

    add_foreign_key :shelves, :users
  end
end
