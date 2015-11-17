class Shelf < ActiveRecord::Base
  validates :user_id, :title, presence: true

end
