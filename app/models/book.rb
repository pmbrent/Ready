class Book < ActiveRecord::Base

  # include PgSearch
  # pg_search_scope :search_by_info, :against => [:title, :author, :isbn]

  validates :title, :author, :isbn, presence: true
  validates :isbn, length: {in: 10..13}
  validate :title_format

  # has_one :author, foreign_key: :author_id

  has_many :shelvings
  has_many :shelves, through: :shelvings

  has_many :ratings

  has_many :recommendations
  has_many :recommended_users,
    through: :recommendations,
    source: :user

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
        books.avg_rating DESC
    SQL

    return result.to_json
  end

  def title_format
    self.title = self.title.titleize
  end
end
