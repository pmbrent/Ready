class User < ActiveRecord::Base

  validates :name, :email, :session_token, presence: true, uniqueness: true
  validates :password_digest, presence: true
  validates :librarian, inclusion: {in: [true, false]}
  validates :password, length: {minimum: 8}, allow_nil: true

  after_initialize :ensure_session_token

  has_many :shelves
  has_many :books, through: :shelves

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

end
