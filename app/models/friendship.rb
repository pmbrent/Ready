class Friendship < ActiveRecord::Base
  validates :followed_user_id, :following_user_id, presence: true
  validate :different_users

  belongs_to :following_user,
    class_name: "User",
    foreign_key: :following_user_id

  belongs_to :followed_user,
    class_name: "User",
    foreign_key: :followed_user_id

  def different_users
    if followed_user_id == following_user_id
      errors.add(:following_user_id, "Please don't follow yourself!")
    end
  end
end
