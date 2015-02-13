require 'bcrypt'

class User < ActiveRecord::Base
  validates :email, presence: true, uniqueness: true

  has_many :links

include BCrypt

  before_create do
    self.greeting = "Good Morning, Beautiful"
    self.background_url = "/images/newbackground.jpg"
    self.font_colour = "white"
  end

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end

  def self.display_greeting(x)
    if x
      return User.find(x).greeting
    else
      return "Welcome to the Stream Team"
    end
  end

end