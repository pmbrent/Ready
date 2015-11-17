class Shelving < ActiveRecord::Base

  validates :shelf_id, :book_id, presence: true

  

end
