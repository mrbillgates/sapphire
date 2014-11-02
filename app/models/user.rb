class User < ActiveRecord::Base

  belongs_to :status
  belongs_to :position
  belongs_to :permission

  validates :firstname, presence: true
  validates :lastname, presence: true
  validates :login, presence: true
  validates :position_id, presence: true
  validates :permission_id, presence: true
  validates :password, presence: true

  def fire
    self.status_id = 2
  end

  def assign(params)
    self.firstname = params['firstname']
    self.lastname = params['lastname']
    self.position_id = params['position']['position_id']
    self.permission_id = params['permission']['permission_id']
    self.login = params['login']
    self.password = params['password']
    self.status_id = 1
  end

  def self.Auth(login, pass)
    user = where('login = ? AND password = ?', login, pass).first

    if user
      return user
    else
      return nil
    end
  end

end

class Status < ActiveRecord::Base

end

class Position < ActiveRecord::Base

end

class Permission < ActiveRecord::Base

end