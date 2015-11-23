class FriendshipsController < ApplicationController

  def create
    @friendship = Friendship.create(following_user_id: current_user.id,
                                    followed_user_id: params[:id].to_i)
    if @friendship.save
      render json: @friendship
    else
      render json: {}
    end
  end

  def destroy
    @friendship = Friendship.where(following_user_id: current_user.id)
                            .where(followed_user: params[:id])[0]
    if @friendship
      @friendship.delete
    end

    render json: @friendship
  end

end
