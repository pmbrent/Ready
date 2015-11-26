class User < ActiveRecord::Base

  validates :name, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :librarian, inclusion: {in: [true, false]}
  validates :password, length: {minimum: 8}, allow_nil: true

  after_initialize :ensure_session_token

  has_many :shelves
  has_many :books, through: :shelves

  has_many :friendships,
    foreign_key: :following_user_id

  has_many :friends,
    through: :friendships,
    source: :followed_user

  has_many :ratings
  has_many :rated_books,
    through: :ratings,
    source: :book

  has_many :recommendations

  has_many :recommended_books,
    through: :recommendations,
    source: :book

  def self.find_by_credentials(userinfo, password)
    user = User.find_by_email(userinfo) || User.find_by_name(userinfo)
    return nil if user.nil?
    user.is_password?(password) ? user : nil
  end

  def password
    @password
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def ensure_session_token
    self.session_token ||= SecureRandom::urlsafe_base64
  end

  def reset_session_token!
    self.session_token = SecureRandom::urlsafe_base64
    self.save!
    self.session_token
  end

  def make_default_shelves
    Shelf.create!(title: "Read",
                  user_id: id)

    Shelf.create!(title: "Reading",
                  user_id: id)

    Shelf.create!(title: "Want to Read",
                  user_id: id)
  end

  def get_feed
    result = ActiveRecord::Base.connection.execute(<<-SQL)
    SELECT
      results.*, user_ratings.rating AS user_rating
    FROM
      (SELECT DISTINCT
        shelvings.created_at, shelvings.id,
        books.id AS book_id, books.isbn, books.author, books.title,
        books.description, books.avg_rating,
        friends.name AS friend, friends.id AS friend_id,
        shelves.title AS shelf_title
      FROM
        shelvings
      JOIN books
        ON shelvings.book_id = books.id
      JOIN shelves
        ON shelvings.shelf_id = shelves.id
      JOIN users
        AS friends ON friends.id = shelves.user_id
      JOIN friendships
        ON friendships.followed_user_id = friends.id
      WHERE
        friendships.following_user_id = #{ActiveRecord::Base.sanitize(self.id)}
      ORDER BY
        shelvings.created_at DESC
      LIMIT
        25) AS results
    LEFT OUTER JOIN
      (SELECT
         *
       FROM
         ratings
       WHERE
         ratings.user_id = #{ActiveRecord::Base.sanitize(self.id)}) AS user_ratings
    ON user_ratings.book_id = results.book_id
    ORDER BY
      results.created_at DESC

    SQL

    return result.to_json
  end

end
