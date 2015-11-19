class Shelving < ActiveRecord::Base

  validates :shelf_id, :book_id, presence: true
  validates :book_id, uniqueness: { scope: :shelf_id }

  belongs_to :shelf
  belongs_to :book

end
