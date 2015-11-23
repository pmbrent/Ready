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

  ## We want the friend's ID (and userpic); Book ISBN, ID, Author, Title; Shelving timestamp

  def get_feed
    Book.find_by_sql([<<-SQL, self.id])
      SELECT
        books.id, books.isbn, books.author, books.title,
        friends.name AS friend, friends.id AS friend_id,
        shelves.title AS shelf_title,
        shelvings.created_at
      FROM
        books
      JOIN
        shelvings
        ON
          shelvings.book_id = books.id
      JOIN
        shelves
        ON shelvings.shelf_id = shelves.id
      JOIN users
        AS friends ON friends.id = shelves.user_id
      JOIN friendships
        ON friendships.followed_user_id = friends.id
      WHERE
        friendships.following_user_id = ?
      ORDER BY
        shelvings.created_at
      LIMIT
        25
    SQL
  end

end
