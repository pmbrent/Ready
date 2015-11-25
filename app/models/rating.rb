class Rating < ActiveRecord::Base

  validates :rating, :user_id, :book_id, presence: true
  validates :book_id, uniqueness: { scope: :user_id }
  validates :rating, numericality: { only_integer: true,
                                     greater_than: 0,
                                     less_than: 6 }

  belongs_to :user
  belongs_to :book

end
