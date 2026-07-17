from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):

    # Database
    DATABASE_URL: str

    # JWT
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    ALGORITHM: str = "HS256"

    # Frontend
    FRONTEND_URL: str

    # Uploads
    UPLOAD_DIR: str = "uploads/avatars"
    MAX_IMAGE_SIZE: int = 5 * 1024 * 1024  # 5 MB

    model_config = SettingsConfigDict(
        env_file=".env"
    )


settings = Settings()