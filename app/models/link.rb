class Link < ActiveRecord::Base
  belongs_to :user
 
	default_scope { order(created_at: 'ASC') }
  # default_scope order('created_at ASC')
end