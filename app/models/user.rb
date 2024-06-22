class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable


  # Association with tasks
  has_many :tasks, dependent: :destroy
  has_many :categories, dependent: :destroy
  has_many :tags, dependent: :destroy
end
