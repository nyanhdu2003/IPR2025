using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using QRPackingApp.Data.Repositories.IRepository;
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

    public async Task AddAsync(Video video)
    {
        await _context.Videos.AddAsync(video);
        await _context.SaveChangesAsync();
    }
}
