class SessionsController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.find_by_credentials(params[:userinfo], params[:password])
    if @user
      session[:sesion_token] = @user.reset_session_token!
    end
  end

  def destroy
    current_user.reset_session_token!
    session[:session_token] = nil
    @user = User.new
  end

private
  def user_params
    params.require(:user).permit(:userinfo, :password)
  end

end
