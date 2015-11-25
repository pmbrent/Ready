class Recommendation < ActiveRecord::Base

  validates :user_id, :book_id, presence: true
  validates :rejected, inclusion: { in: %w(true false) }
  validates :book_id, uniqueness: { scope: :user_id }

  def self.generate_recs_for_user_id(user_id)
    Recommendation.list_rec_ids_for_user_id(user_id).each do |book_id|
      Recommendation.create(user_id: user_id, book_id: book_id)
    end
  end

  def self.list_rec_ids_for_user_id(user_id)
    rec_users = Recommendation.generate_trusted_users_for_user(user_id)

    book_ids = []

    rec_users.each do |rec|
      book_ids.concat(Recommendation.get_top_books_from_user_id(rec["user_id"]));
    end

    return book_ids.uniq
  end

  def self.get_top_books_from_user_id(given_id)

    result = ActiveRecord::Base.connection.execute(<<-SQL)

    SELECT DISTINCT
      ratings.book_id, ratings.rating
    FROM
      ratings
    WHERE
      ratings.user_id = #{ActiveRecord::Base.sanitize(given_id)}
    ORDER BY
      ratings.rating DESC
    LIMIT 5

    SQL

    book_ids = []

    result.map do |item|
      book_ids.push(item["book_id"].to_i)
    end

    book_ids

  end

  def self.generate_trusted_users_for_user(user_id)
    result = ActiveRecord::Base.connection.execute(<<-SQL)

    SELECT DISTINCT
      ratings.user_id, ratings.created_at
    FROM
      ratings
    JOIN (
      SELECT
        ratings.book_id, ratings.rating
      FROM
        ratings
      WHERE
        ratings.user_id = #{ActiveRecord::Base.sanitize(user_id)}
      ) AS user_ratings
    ON user_ratings.book_id = ratings.book_id
    WHERE user_ratings.rating = ratings.rating
      AND ratings.user_id != #{ActiveRecord::Base.sanitize(user_id)}
    ORDER BY
      ratings.created_at DESC
    LIMIT 100

    SQL
  end

end
