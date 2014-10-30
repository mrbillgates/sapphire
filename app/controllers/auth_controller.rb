class AuthController < ApplicationController

  def CheckCookies
    if !cookies['userid'].blank? || !cookies['permission'].blank?
      if (cookies['userid'].to_f == -1)
        return false
      end
    else
      return false
    end
    return true
  end

  def signout
    cookies.delete('userid')
    cookies.delete('permission')
    redirect_to :action => 'signin'
  end

  def signin

    if self.CheckCookies
      redirect_to :controller => 'index', :action => 'show'
    else
      @login = params['login']
      @pass = params['pass']
      user = User.Auth(@login, @pass)
     if (user != nil)
        cookies['userid'] = user.id
        cookies['permission'] = user.permission.id
        redirect_to :controller => 'index', :action => 'show'
     end
    end

  end

end
