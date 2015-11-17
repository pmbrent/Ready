class Shelf < ActiveRecord::Base
  validates :user_id, :title, presence: true

  belongs_to :user
  has_many :shelvings
  has_many :books, through: :shelvings

end
