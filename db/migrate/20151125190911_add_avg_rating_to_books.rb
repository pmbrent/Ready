class AddAvgRatingToBooks < ActiveRecord::Migration
  def change
    add_column :books, :avg_rating, :float, default: 0, null: false
  end
end
