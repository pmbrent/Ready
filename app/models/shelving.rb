class Shelving < ActiveRecord::Base

  validates :shelf_id, :book_id, presence: true

  belongs_to :shelf
  belongs_to :book

end
