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

end
