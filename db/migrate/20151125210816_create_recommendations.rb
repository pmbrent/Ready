class CreateRecommendations < ActiveRecord::Migration
  def change
    create_table :recommendations do |t|
      t.integer :user_id, null: false
      t.integer :book_id, null: false
      t.boolean :rejected

      t.timestamps null: false
    end

    add_foreign_key :recommendations, :users
    add_index :recommendations, :user_id

    add_foreign_key :recommendations, :books
    add_index :recommendations, :book_id

    add_index :recommendations, :rejected
  end
end
