class IndexController < ApplicationController

  def CheckRedirect
    if !cookies['userid'].blank? || !cookies['permission'].blank?
      if cookies['userid'].to_f == -1
        redirect_to :controller => 'auth', :action => 'signin'
      end
    else
      redirect_to :controller => 'auth', :action => 'signin'
    end
  end

  def show
    self.CheckRedirect
    if self.GetPermission > 2
      @users = Array(User.find(self.GetUserId))
    else
      @users = User.all
    end
  end

  def search
    self.CheckRedirect
    if self.GetPermission > 2
      @users = Array(User.find(self.GetUserId))
      redirect_to :action => 'show'
    else
      @query_string = "%#{params['query']}%"
      @users = User.where('firstname LIKE ? OR lastname LIKE ? OR positions.name LIKE ?', @query_string, @query_string, @query_string).joins(:position)
      render 'show'
    end

  end

  def fire

    if User.exists?(params['id'])
      user = User.find(params['id'])
      user.fire
      user.save
    end

    render nothing: true
  end

  def delete
    self.CheckRedirect
    if User.find(params['id']).destroy
      redirect_to :action => 'show'
    end
  end

  def create
    self.CheckRedirect
    if params['operation_type'] == 'add'
      user = User.new
      user.assign(params)
      if self.GetPermission > 1
        user.permission_id = 3
      end
      if user.valid?
        user.save
      end
    else
      user = User.find(params['operation']);
      user.assign(params)
      if user.valid?
        user.save
      end
    end
    redirect_to :action => 'show'
  end

  def GetPermission
    permission = 0
    if !cookies['permission'].blank?
      permission = cookies['permission'].to_f
    end
    return permission
  end

  def GetUserId
    userid = 0
    if !cookies['userid'].blank?
      userid = cookies['userid'].to_i
    end
    return userid
  end

  helper_method :GetPermission

end
