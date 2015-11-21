class CreateFriendships < ActiveRecord::Migration
  def change
    create_table :friendships do |t|
      t.integer :followed_user_id, null: false
      t.integer :following_user_id, null: false

      t.timestamps null: false
    end

    add_index :friendships, :followed_user_id
    add_foreign_key :friendships, :users, column: :followed_user_id

    add_index :friendships, :following_user_id
    add_foreign_key :friendships, :users, column: :following_user_id
  end
end
