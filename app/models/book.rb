class Book < ActiveRecord::Base

  validates :title, :author, :isbn, presence: true
  validates :isbn, length: {in: 10..13}

  # has_one :author, foreign_key: :author_id

  has_many :shelvings
  has_many :shelves, through: :shelvings

  has_many :ratings

  def calc_avg_rating
    self.avg_rating = self.ratings.average(:rating).to_f
    self.save
  end

  def self.all_with_ratings(user_id)
    result = ActiveRecord::Base.connection.execute(<<-SQL)
      SELECT DISTINCT
        books.*, user_ratings.rating
      FROM
        books
      LEFT OUTER JOIN (
        SELECT
          ratings.rating, ratings.book_id
        FROM
          ratings
        WHERE
          ratings.user_id = #{ActiveRecord::Base.sanitize(user_id)}
        ) AS user_ratings
        ON user_ratings.book_id = books.id
      ORDER BY
        books.id
    SQL

    return result.to_json
  end
end
