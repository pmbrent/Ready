class Recommendation < ActiveRecord::Base

  validates :user_id, :book_id, presence: true
  validates :rejected, inclusion: { in: %w(true false) }
  validates :book_id, uniqueness: { scope: :user_id }



  def self.generate_recs_for_user(user_id)
    result = ActiveRecord::Base.connection.execute(<<-SQL)

    SELECT DISTINCT
      ratings.user_id, ratings.created_at, ratings.book_id
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

    ## Makes a list of users who have agreed with current user on one rating.

    return result.to_json
  end

end
