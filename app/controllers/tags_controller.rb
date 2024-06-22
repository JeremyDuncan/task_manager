class TagsController < ApplicationController
  before_action :authenticate_user!

  def index
    @tags = current_user.tags
    render json: @tags
  end

  def create
    @tag = current_user.tags.build(tag_params)
    if @tag.save
      render json: @tag, status: :created
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def update
    @tag = current_user.tags.find(params[:id])
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @tag = current_user.tags.find(params[:id])
    @tag.destroy
    head :no_content
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
