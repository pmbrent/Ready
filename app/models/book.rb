class Book < ActiveRecord::Base

  validates :title, :author, :isbn, presence: true
  validates :isbn, length: {in: 10..13}

  # has_one :author, foreign_key: :author_id

  has_many :shelvings
  has_many :shelves, through: :shelvings

  has_many :ratings

end
