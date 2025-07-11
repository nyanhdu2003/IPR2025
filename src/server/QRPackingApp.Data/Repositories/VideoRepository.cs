using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QRPackingApp.Data.Repositories.IRepository;
using QRPackingApp.DTO;
using QRPackingApp.Model;

namespace QRPackingApp.Data.Repositories;

public class VideoRepository : IVideoRepository
{
    private readonly QRPackingAppDbContext _context;
    private readonly ILogger<VideoRepository> _logger;

    public VideoRepository(QRPackingAppDbContext context, ILogger<VideoRepository> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<Video?> GetByIdAsync(Guid id)
    {
        try
        {
            return await _context.Videos
                .FirstOrDefaultAsync(v => v.Id == id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching video by ID");
            throw;
        }
    }

    public async Task<HistoryVideoViewModel?> GetVideoByIdAsync(Guid id)
    {
        try
        {
            return await _context.Videos
                .Where(v => v.Id == id)
                .Select(v => new HistoryVideoViewModel
                {
                    Id = v.Id,
                    ProductName = v.Product.Name,
                    UserName = v.User.Username,
                    StartAt = v.StartedAt,
                    EndAt = v.EndedAt,
                    FilePath = v.FilePath
                })
                .FirstOrDefaultAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching video by ID");
            throw;
        }
    }
    public async Task<List<Video>> GetVideosAsync(int pageNumber, int pageSize)
    {
        try
        {
            return await _context.Videos
                .OrderBy(v => v.UploadedAt) // Optional: Order by a specific field
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error fetching paginated videos");
            throw;
        }
    }
    public async Task DeleteAsync(Video video)
    {
        try
        {
            _context.Videos.Remove(video);
            await _context.SaveChangesAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting video");
            throw;
        }
    }
    public async Task<List<Video>> GetAllIncludingAsync(
    Func<IQueryable<Video>, IQueryable<Video>> include,
    int skip,
    int take)
    {
        IQueryable<Video> query = _context.Videos;

        if (include != null)
        {
            query = include(query);
        }

        return await query
            .OrderByDescending(v => v.UploadedAt)
            .Skip(skip)
            .Take(take)
            .ToListAsync();
    }

    public async Task AddAsync(Video video)
    {
        await _context.Videos.AddAsync(video);
        await _context.SaveChangesAsync();
    }

    public async Task<List<HistoryVideoViewModel>> GetVideosByUserIdAsync(Guid userId)
    {
        return await _context.Videos
            .Where(v => v.UserId == userId)
            .Select(v => new HistoryVideoViewModel
            {
                Id = v.Id,
                ProductName = v.Product.Name,
                UserName = v.User.Username,
                StartAt = v.StartedAt,
                EndAt = v.EndedAt,
                FilePath = v.FilePath
            })
            .ToListAsync();
    }

    public async Task<List<HistoryVideoViewModel>> GetVideosByProductIdAsync(Guid productId)
    {
        return await _context.Videos
            .Where(v => v.ProductId == productId)
            .Select(v => new HistoryVideoViewModel
            {
                Id = v.Id,
                ProductName = v.Product.Name,
                UserName = v.User.Username,
                StartAt = v.StartedAt,
                EndAt = v.EndedAt,
                FilePath = v.FilePath
            })
            .ToListAsync();
    }
}
