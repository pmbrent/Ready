class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user.create(user_params)
    if @user.save
      log_in(@user)
    else
      render :new
    end
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
