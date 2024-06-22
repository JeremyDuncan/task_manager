class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :update, :destroy]

  def index
    @tasks = current_user.tasks
    respond_to do |format|
      format.html
      format.json { render json: @tasks.to_json(include: :tags) }
    end
  end

  def show
    respond_to do |format|
      format.json { render json: @task.to_json(include: :tags) }
    end
  end

  def create
    @task = current_user.tasks.build(task_params)
    if @task.save
      render json: @task, status: :created
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @task.destroy
    head :no_content
  end

  private

  def set_task
    if params[:id].match?(/^\d+$/)
      @task = current_user.tasks.find(params[:id])
    else
      render json: { error: "Invalid ID" }, status: :not_found
    end
  end

  def task_params
    params.require(:task).permit(:title, :description, :due_date, :category_id, tag_ids: [])
  end
end
