class User < ActiveRecord::Base
  validates :password, presence: true
  validates :email, presence: true, uniqueness: true

  has_many :links

  before_create do
    self.greeting = "Good Morning, Beautiful"
    self.background_url = "/images/newbackground.jpg"
    self.font_colour = "white"
  end

  def self.display_greeting(x)
    if x
      return User.find(x).greeting
    else
      return "Welcome to the Stream Team"
    end
  end

end