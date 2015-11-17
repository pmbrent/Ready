class Book < ActiveRecord::Base

  validates :title, :author, :isbn, presence: true
  validates :isbn, length: {is: 13} #no ISBN 10

  # has_one :author, foreign_key: :author_id

  has_many :shelvings
  has_many :shelves, through: :shelvings

end
