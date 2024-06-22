class TasksController < ApplicationController
  before_action :authenticate_user!
  before_action :set_task, only: [:show, :edit, :update, :destroy]


  def index
    @tasks = current_user.tasks
    respond_to do |format|
      format.html
      format.json { render json: @tasks }
    end
  end

  # def show
  #   @task = current_user.tasks.find(params[:id])
  #   render json: @task
  # end
  def show
    respond_to do |format|
      format.json { render json: @task }
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
    @task = current_user.tasks.find(params[:id])
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # def destroy
  #   @task = current_user.tasks.find(params[:id])
  #
  #   if @task.destroy
  #     flash[:notice] = 'Task was successfully deleted.'
  #   else
  #     flash[:alert] = 'There was an error deleting the task.'
  #   end
  #
  #   redirect_to tasks_path
  # end
  def destroy
    @task.destroy
    head :no_content
  end

  private
  def set_task
    @task = current_user.tasks.find(params[:id])
  end
  def task_params
    params.require(:task).permit(:title, :description, :due_date, :category_id, tag_ids: [])
  end
end




